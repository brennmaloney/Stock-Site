<script>
    import { signInUser, initializeAuthListener, setAuthPersistence } from '../../lib/firebase'

    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation'

    let email = '';
    let password = '';
    let rememberMe = false;
    let isLoggedIn = writable(false);
    let user = null;

    initializeAuthListener((authUser) => {
        user = authUser;
    }); 

    const handleLogin = async () => {
        try {
            await setAuthPersistence(rememberMe);
            const userId = await signInUser(email, password);
            isLoggedIn.set(true);
            console.log("logged in with userId: ", userId);
            goto('/');
        } catch (error) {
            console.error('Error signing in:', error.message);
        }
    }

</script>

<div class="Center rounded-lg p-6">
    <div class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md flex-1">
        <h1 class="text-3xl font-bold self-center">Log in</h1>

        <span class="self-center">
            Don't have an account?
            <a class="link link-secondary" href="/register">Register</a>
        </span>

        <div class="divider">OR</div>

        <label class="form-control">
            <div class="label">
                <span class="label-text">Email</span>
            </div>

            <input class="input input-bordered" type="email" placeholder="Email" bind:value={email}/>
        </label>

        <label class="form-control">
            <div class="label">
                <span class="label-text">Password</span>
                <a class="label-text link link-accent">Forgot password?</a>
            </div>

            <input class="input input-bordered" type="password" placeholder="Password" bind:value={password}/>
        </label>

        <div class="form-control">
            <label class="cursor-pointer label self-start gap-2">
                <input type="checkbox" class="checkbox"  bind:value={rememberMe}/>
                <span class="label-text">Remember me</span>
            </label>
        </div>

        <button class="btn btn-primary rounded-lg" on:click={handleLogin}>Log In</button>
    </div>
</div>