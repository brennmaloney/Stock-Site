<script>
    import { onMount, onDestroy } from 'svelte';
    import '../global.css';
    import Logo from '../images/logo.png';
    import { page } from '$app/stores';

    let is_mobile = false;
    let show_menu = false;

    function toggleMenu() {
        show_menu = !show_menu;
    }

    if (typeof window !== 'undefined') {
        onMount(() => {
            is_mobile = window.innerWidth <= 767;
            window.addEventListener('resize', handleResize);
        });

        function handleResize() {
            is_mobile = window.innerWidth <= 767;
        }

        window.addEventListener('click', function (e) {
            if (show_menu && !document.getElementById('nav-menu').contains(e.target)) {
                toggleMenu();
            }
        });
    }

    $: currentPath = $page.url.pathname;
</script>

<div class="header-container">
    <div class="header-section">
        <div class={is_mobile ? 'mobile-logo' : 'desktop-logo'}>
            <a href="/">
                <img src={Logo} alt="logo" />
            </a>
        </div>
        <div class="header-navigation Desktop Center">
            <ul class="nav-list">
                <li class="nav-item"><a href="/" class="nav-link {currentPath === '/' ? 'active' : ''}">HOME</a></li>
                <li class="nav-item"><a href="/markets" class="nav-link {currentPath === '/markets' ? 'active' : ''}">MARKETS</a></li>
                <li class="nav-item"><a href="/portfolio" class="nav-link {currentPath === '/portfolio' ? 'active' : ''}">PORTFOLIO</a></li>
                <li class="nav-item"><a href="/calculations" class="nav-link {currentPath === '/calculations' ? 'active' : ''}">CALCULATIONS</a></li>
                <li class="nav-item"><a href="/news" class="nav-link {currentPath === '/news' ? 'active' : ''}">NEWS</a></li>
            </ul>
        </div>
        <div class="nav-menu" id="nav-menu">
            <nav>
                <button class="hamburger-menu {show_menu ? 'active' : ''}" on:click={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <div class="off-screen-menu {show_menu ? 'active' : ''}">
                <ul>
                    <li><a href="/" class={currentPath === '/' ? 'active' : ''} on:click={toggleMenu}>HOME</a></li>
                    <li><a href="/markets" class={currentPath === '/markets' ? 'active' : ''} on:click={toggleMenu}>MARKETS</a></li>
                    <li><a href="/portfolio" class={currentPath === '/portfolio' ? 'active' : ''} on:click={toggleMenu}>PORTFOLIO</a></li>
                    <li><a href="/calculations" class={currentPath === '/calculations' ? 'active' : ''} on:click={toggleMenu}>CALCULATIONS</a></li>
                    <li><a href="/news" class={currentPath === '/news' ? 'active' : ''} on:click={toggleMenu}>NEWS</a></li>
                    <li><a href="/login" class={currentPath === '/login' ? 'active' : ''} on:click={toggleMenu}>LOGIN</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    .header-container {
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
        height: 10vh;
        background-color: var(--dark-blue);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header-section {
        display: flex;
        align-items: center;
        margin: auto;
        width: 95%;
        height: 100%;
    }

    .mobile-logo,
    .desktop-logo {
        margin-right: calc(var(--gap)*2);
    }
    .mobile-logo img {
        width: 10em;
    }
    .desktop-logo img {
        width: 11.5em;
    }
    .mobile-logo {
        margin-left: var(--gap);
    }

    .header-navigation {
        display: flex !important;
        justify-content: space-between;
        align-items: center;
        margin-right: auto;
        gap: calc(var(--gap)*2);

    }
    .nav-list {
        display: flex;
        list-style-type: none;
        gap: calc(var(--gap)*3.5);
    }
    .nav-item {
        list-style: none;
    }
    .nav-link {
        color: var(--off-white);
        text-decoration: none;
        font-size: 18px;
    }
    .nav-link:hover,
    .nav-link:focus {
        color: var(--white);
    }
    .nav-link::after {
        content: '';
        height: 2px;
        width: 100%;
        background-color: var(--dark-blue);
        display: block;
        opacity: 0;
        transition: all 0.2s;
    }
    .nav-link:hover::after {
        opacity: 1;
    }
    .nav-link.active {
        color: var(--white);
    }
    .nav-link.active::after {
        opacity: 1;
    }
</style>