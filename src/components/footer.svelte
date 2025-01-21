<script>
    import "../global.css";
</script>

<footer class="grid grid-cols-2 bg-base-200 text-base-content px-4 py-2 md:px-8">
    <div class="flex justify-center p-4">
        <nav class="flex-col content-center">
            <h6 class="footer-title">Brennan Maloney 2024</h6>
            <div class="grid grid-flow-col gap-4">
                    <a href="https://github.com/brennmaloney" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-square-github text-5xl"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/brennanmaloney" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-linkedin text-5xl"></i>
                    </a>
                    <a href="https://x.com/_brennanmaloney" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-x-twitter text-5xl"></i>
                    </a>
            </div>
        </nav>
    </div>
    <div class="flex justify-center p-4">
        <form class="flex-col content-center">
            <h6 class="footer-title">Get Daily Updates</h6>
            <fieldset class="form-control w-80">
                <label class="label">
                    <span class="label-text">Enter your email address</span>
                </label>
                <div class="join">
                    <input
                        type="text"
                        placeholder="username@site.com"
                        class="input input-bordered join-item" />
                    <button class="btn btn-primary join-item">Subscribe</button>
                </div>
            </fieldset>
        </form>
    </div>
</footer>