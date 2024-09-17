<script>
    let theme = 'dracula';

    function toggleTheme() {
        theme = theme === 'dracula' ? 'autumn' : 'dracula';
        document.body.setAttribute('data-theme', theme);
    }
</script>

<div class="px-4 py-2 md:px-8 md:py-2">
    <div class="navbar bg-base-100 h-16 p-0">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
            </div>
            <ul class="menu menu-sm dropdown-content bg-accent rounded-box z-[1] mt-3 w-64 p-3 shadow">
                <li><a href="/">Homepage</a></li>
                <li><a href="/markets">Markets</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/calculations">Calculations</a></li>
                <li><a href="/news">News</a></li>
            </ul>
        </div>
        <div class="flex-1 flex items-center">
            <a href="/">
                <img src="logo.png" alt="Logo" class="h-12 ml-4"/>
            </a>
        </div>
        <input type="checkbox" class="toggle bg-primary hover:bg-secondary mr-4" checked="checked" on:click={() => toggleTheme()}/>
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-square btn-ghost text-2xl"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                    </path>
                </svg>
            </div>
            <ul class="menu menu-sm dropdown-content bg-accent rounded-box z-[1] mt-3 w-32 p-3 shadow">
                <li><a href="/">Login</a></li>
                <li><a href="/">FAQ</a></li>
            </ul>
        </div>
    </div>
</div>

