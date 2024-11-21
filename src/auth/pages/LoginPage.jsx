import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';

export const LoginPage = () => {
	const { status } = useSelector((state) => state.authSlice);
	const dispatch = useDispatch();

	const { email, password, onInputChange } = useForm({
		email: 'ejemplo@gmail.com',
		password: '123456',
	});

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const onSubmit = (event) => {
		event.preventDefault();
		// console.log({ email, password });
		dispatch(checkingAuthentication());
	};

	const onGoogleSingIn = () => {
		// console.log('onGoogleSingIn');
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title="Login">
			<form onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder="ejemplo@google.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="ejemplo@google.com"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								type="submit"
								variant="contained"
								fullWidth
							>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								onClick={onGoogleSingIn}
								variant="contained"
								fullWidth
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
