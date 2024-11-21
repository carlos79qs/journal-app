import { signInWithGoogle } from '../../firebase/providers';
import { login, logout, checkingCredentials } from './authSlice';

export const checkingAuthentication = (email, passwor) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const result = await signInWithGoogle();
		//* Si falla
		if (!result) return dispatch(logout(result.errorMessage));
		//* Si no falla
		dispatch(login(result));
	};
};