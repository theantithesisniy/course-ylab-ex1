import { useState } from 'react';
import styles from './AuthenticationPage.module.scss';

interface IUser {
	email: string;
	password: string;
}

interface IFetchParams {
	url: string;
	options: {
		method: string;
		body: string;
	};
}

interface IPromiseParams {
	status: number;
	data: any;
}

const AuthenticationPage: React.FC = () => {

	const [formData, setFormData] = useState<IUser>({
		email: '',
		password: ''
	});

	const [message, setMessage] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData(prev => ({
			...prev,
			[id]: value
		}));
	};

	const mockFetch = ({ url, options }: IFetchParams) => {
		return new Promise<IPromiseParams>((resolve, reject) => {
			const { email, password } = JSON.parse(options.body);

			setTimeout(() => {
				if (email === 'test@gmail.com' && password === 'test123') {
					resolve({
						status: 200,
						data: { message: 'Успешная аутентификация', token: 'mocked_token' }
					});
				} else {
					reject({
						status: 400,
						data: { message: 'Неверная почта или пароль' }
					});
				}
			}, 1000);
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage('');

		try {
			const response = await mockFetch({
				url: '/api/auth',
				options: {
					method: 'POST',
					body: JSON.stringify({ email: formData.email, password: formData.password })
				}
			});

			if (response.status === 200) {
				setMessage(response.data.message);
				// Здесь можно сохранить токен в localStorage и т.д.
				console.log('Token:', response.data.token);
			}
		} catch (error: any) {
			setMessage(error.data.message || 'Произошла ошибка');
		}
	};

	return (
		<div className={styles['form-container']}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<fieldset>
					<legend>Вход</legend>

					<div className={styles['input-group']}>
						<label htmlFor="email">Электронная почта пользователя:</label>
						<input
							type="email"
							id="email"
							value={formData.email}
							onChange={handleInputChange}
							autoComplete="email"
							required
						/>
					</div>

					<div className={styles['input-group']}>
						<label htmlFor="password">Пароль:</label>
						<input
							type="password"
							id="password"
							value={formData.password}
							onChange={handleInputChange}
							autoComplete="current-password"
							required
						/>
					</div>

					<a href="#" className={styles['forgot-password-link']}>Забыли пароль?</a>

					<button type="submit" className={styles['submit-btn']}>
						Войти
					</button>

					{message && <p className={styles.message}>{message}</p>}
				</fieldset>
			</form>
		</div>
	);
};

export default AuthenticationPage;
