<script>
    import { initializeAuthListener } from '../lib/firebase'

    let user = null;

    initializeAuthListener((authUser) => {
        user = authUser;
    });

    function toPage(page) {
        goto(`/${page}`);
    }
</script>


<div class="hero min-h-screen" style="background-image: url(/images/background.png);">
    <div class="hero-overlay bg-opacity-80"></div>
    <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold" style="text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.2);">Hello there</h1>
        <p class="mb-5 text-xl" style="text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.2);">
            {@html user ? '' : 'Welcome to my Stock Market Website!<br />Make an account to save all of the stocks that you purchase'}
        </p>
        <a class="btn btn-primary rounded-lg" href="{user ? '/markets' : '/register'}">{user ? "To Markets" : "Get Started"}</a>
        </div>
    </div>
</div>

<!-- <div class="Center">
    <div class="carousel rounded-box">
        <div class="carousel-item">
            <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger" />
        </div>
        <div class="carousel-item">
            <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Burger" />
        </div>
        <div class="carousel-item">
            <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Burger" />
        </div>
        <div class="carousel-item">
            <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                alt="Burger" />
        </div>
        <div class="carousel-item">
            <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                alt="Burger" />
        </div>
        <div class="carousel-item">
            <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                alt="Burger" />
        </div>
        <div class="carousel-item">
            <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                alt="Burger" />
        </div>
    </div>
</div> -->


<style>
</style>