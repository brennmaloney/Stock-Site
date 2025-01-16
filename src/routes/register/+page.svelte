<script>
    import { signUpUser } from '../../lib/firebase'
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation'

    let name_first = '';
    let name_last = '';
    let email = '';
    let password = '';
    let rememberMe = false;
    let isLoggedIn = writable(false);

    const handleSignup = async () => {
        try {
            console.log(email, password)
            const userId = await signUpUser(email, password, name_first, name_last);
            isLoggedIn.set(true);
            console.log("logged in with userId: ", userId);
            goto('/');
        } catch (error) {
            console.error('Error signing in:', error.message);
        }
    }
</script>

<div class="Center">
    <div class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-lg flex-1">
        <h1 class="text-3xl font-bold self-center">Register</h1>

        <span class="self-center">
            Already have an account?
            <a class="link link-secondary" href="/login">Login</a>
        </span>

        <div class="divider">OR</div>

        <div class="flex w-full justify-between">
            <label class="form-control">
                <div class="label">
                    <span class="label-text">First Name</span>
                </div>
                
                <input class="input input-bordered" bind:value={name_first}/>
            </label>
            <label class="form-control">
                <div class="label">
                    <span class="label-text">Last Name</span>
                </div>
                
                <input class="input input-bordered" bind:value={name_last}/>
            </label>
        </div>

        <label class="form-control">
            <div class="label">
                <span class="label-text">Email</span>
            </div>

            <input class="input input-bordered" type="email" bind:value={email}/>
        </label>

        <label class="form-control">
            <div class="label">
                <span class="label-text">Password</span>
            </div>

            <input class="input input-bordered" type="password" bind:value={password}/>
        </label>

        <div class="form-control">
            <label class="cursor-pointer label self-start gap-2">
                <input type="checkbox" class="checkbox"  bind:value={rememberMe}/>
                <span class="label-text">Remember me</span>
            </label>
        </div>

        <button class="btn btn-primary" on:click={handleSignup}>Sign Up</button>
    </div>
</div>


<style>
</style>