<script lang="ts">
	import { enhance} from '$app/forms';
    import type {SubmitFunction} from "@sveltejs/kit"
	let err = '';

	const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
        const {password, confirmPassword} = Object.fromEntries(formData)

        if (password !== confirmPassword) {
            err = "Passwords are not the same"
            cancel()
            return
        }
    }

</script>

<div class="container">
	<form method="POST" use:enhance={handleSubmit}>
		<label>
			Name
			<input required name="name" autocomplete="name" />
		</label>
		<label>
			Email
			<input required name="email" type="email" autocomplete="email" />
		</label>
		<label>
			Password
			<input required name="password" type="password" autocomplete="new-password" />
		</label>
		<label>
			Confirm Password
			<input required name="confirmPassword" type="password" />
		</label>
		<button>Sign up</button>
		<a href="/auth/login" class="secondary">Log in</a>
		{#if err}
			<p class="outline">{err}</p>
		{/if}
	</form>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
	}

	form {
		display: grid;
		padding: 1rem;
	}

	a {
		text-align: center;
		margin-top: 1rem;
	}

	p {
		margin-top: 1rem;
		color: salmon;
	}
</style>
