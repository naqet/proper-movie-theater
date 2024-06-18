<script>
	import { signIn } from '@auth/sveltekit/client';

	let email = '';
	let password = '';

	function handleSubmit() {
		signIn('credentials', { email, password, callbackUrl: "/" });
	}
</script>

<div class="container">
	<form on:submit|preventDefault={handleSubmit}>
		<label>
			Email
			<input name="email" type="email" autocomplete="email" bind:value={email} />
		</label>
		<label>
			Password
			<input name="password" type="password" autocomplete="current-password" bind:value={password} />
		</label>
		<button>Log in</button>
	</form>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
	}

	form {
		display: grid;
		gap: 0.5rem;
		padding: 1rem;
	}
</style>
