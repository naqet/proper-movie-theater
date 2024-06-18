<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<header>
	<nav>
		<a href="/"><strong>Logo</strong></a>
		<ul>
			<li>
				<a href="/whats-on" class="secondary">What's on</a>
			</li>

			<li>
				<a href="/coming-soon" class="secondary">Coming soon</a>
			</li>

			<li>
				<a href="/club" class="secondary">Club</a>
			</li>

			<li>
				{#if $page.data.session}
					<details class="dropdown">
						<summary>Account</summary>
						<ul>
							<li>
								<a href="/profile">Profile</a>
							</li>
							<li>
								<a href="/settings">Settings</a>
							</li>
							<li>
								<a href="" on:click={() => signOut()}>Log out</a>
							</li>
						</ul>
					</details>
				{:else}
					<a href="/auth/login">Log in</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<style>
	nav {
		align-items: center;
	}
</style>
