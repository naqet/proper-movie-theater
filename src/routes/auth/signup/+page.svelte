<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	let samePasswords = true;

	const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
		const { password, confirmPassword } = Object.fromEntries(formData);

		if (password !== confirmPassword) {
            samePasswords = false
			cancel();
			return;
		}
	};

	export let form: ActionData;
</script>

<div class="container">
	<form method="POST" use:enhance={handleSubmit}>
		<label>
			Name
			<input required name="name" autocomplete="name" />
		</label>
		<label>
			Email
			<input
				required
				name="email"
				type="email"
				autocomplete="email"
				aria-invalid={form?.emailDuplicate}
				aria-describedby={form?.emailDuplicate ? 'email-duplicate' : null}
			/>
			{#if form?.emailDuplicate}
				<small id="email-duplicate">Account with this email already exists</small>
			{/if}
		</label>
		<label>
			Password
			<input required name="password" type="password" autocomplete="new-password" />
		</label>
		<label>
			Confirm Password
			<input
				required
				name="confirmPassword"
				type="password"
                aria-invalid={!samePasswords ? true : null}
				aria-describedby={!samePasswords ? 'invalid-passwords' : null}
			/>
			{#if !samePasswords}
				<small id="invalid-passwords">Passwords don't match</small>
			{/if}
		</label>
		<button>Sign up</button>
		<a href="/auth/login" class="secondary">Log in</a>
	</form>
</div>

<style>
	.container {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
		display: grid;
		place-items: center;
        margin-inline: auto;
        padding: 0;
	}

	form {
		display: grid;
	}

	a {
		text-align: center;
		margin-top: 1rem;
		margin-inline: auto;
	}
</style>
