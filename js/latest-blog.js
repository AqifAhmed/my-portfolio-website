document.addEventListener('DOMContentLoaded', () => {
    const showcaseContainer = document.getElementById('showcase-content');

    if (!showcaseContainer || !blogPosts || blogPosts.length === 0) {
        console.warn('Showcase container or blog posts not found/empty.');
        return;
    }

    // Sort blogs by date (newest first)
    const sortedBlogs = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestBlog = sortedBlogs[0];

    // Create the HTML structure
    const blogHTML = `
        <div class="row g-0">
            <div class="col-lg-12 d-flex align-items-center bg-darker">
                <div class="p-5 w-100 text-center">
                    <span class="badge bg-secondary mb-3">${latestBlog.tags[0]}</span>
                    <h3 class="h1 fw-bold mb-3">${latestBlog.title}</h3>
                    <p class="text-white-50 mb-2">${latestBlog.date}</p>
                    <p class="mb-4 text-white-50 mx-auto" style="max-width: 600px;">
                        ${latestBlog.description}
                    </p>
                    <a href="${latestBlog.link}" target="_blank" class="btn btn-pixelated">Live Preview</a>
                </div>
            </div>
        </div>
    `;

    // Inject into the DOM
    showcaseContainer.innerHTML = blogHTML;
});
