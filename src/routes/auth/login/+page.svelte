<script>
	import { signIn } from '@auth/sveltekit/client';

	let email = '';
	let password = '';

	function handleSubmit() {
		signIn('credentials', { email, password, callbackUrl: "/"});
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
			<input
				name="password"
				type="password"
				autocomplete="current-password"
				bind:value={password}
			/>
		</label>
		<button>Log in</button>
		<div class="links">
			<a href="/auth/remind" class="secondary">Remind Password</a>
			<a href="/auth/signup" class="secondary">Sign up</a>
		</div>
	</form>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
	}

	.links {
		display: flex;
		justify-content: space-between;
	}

	form {
		display: grid;
		padding: 1rem;
	}

	a {
		text-align: center;
		margin-top: 1rem;
	}
</style>
