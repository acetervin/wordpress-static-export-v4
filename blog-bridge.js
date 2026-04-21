/**
 * Technical Bridge for Blog Pages
 * Handles dynamic loading of blog posts and details.
 */

const blogManager = {
    async getPosts() {
        try {
            const response = await fetch('posts.json');
            return await response.json();
        } catch (e) {
            console.error("Failed to load posts:", e);
            return [];
        }
    },

    async initBlog() {
        const posts = await this.getPosts();
        const grid = document.querySelector('.list-post');
        if (!grid) return;

        grid.innerHTML = posts.map(post => `
            <article class="post type-post status-publish format-standard has-post-thumbnail hentry">
                <div class="entry-thumb single-thumb">
                    <a class="post-thumbnail" href="blog-details.html?post=${post.slug}">
                        <img width="1410" height="900" src="${post.image}" class="attachment-rappod-full-width size-rappod-full-width wp-post-image" alt="${post.title}">
                    </a>
                    <div class="post-categories">
                        <a href="#"><span>${post.category}</span></a>
                    </div>
                </div>
                <div class="post-content">
                    <div class="entry-date">
                        <a href="blog-details.html?post=${post.slug}"><time class="published">${post.date}</time></a>
                    </div>
                    <h3 class="entry-title"><a href="blog-details.html?post=${post.slug}">${post.title}</a></h3>
                    <p class="post-excerpt">${post.excerpt}</p> 
                    <a class="read-more" href="blog-details.html?post=${post.slug}">Read More</a>
                </div>
            </article>
        `).join('');

        this.updateSidebar(posts);
    },

    async initDetails() {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('post');
        const posts = await this.getPosts();
        const post = posts.find(p => p.slug === slug) || posts[0];

        if (!post) return;

        // Update Title & Breadcrumb
        const titleEl = document.querySelector('.entry-title');
        if (titleEl) titleEl.textContent = post.title;
        
        const currentBreadcrumb = document.querySelector('.bwp-breadcrumb .current');
        if (currentBreadcrumb) currentBreadcrumb.textContent = post.title;

        // Update Image
        const imgEl = document.querySelector('.entry-thumb img');
        if (imgEl) {
            imgEl.src = post.image;
            imgEl.srcset = ""; // Clear srcset to prevent loading old images
        }

        // Update Content
        const contentEl = document.querySelector('.post-excerpt');
        if (contentEl) contentEl.innerHTML = post.content;

        // Update Category
        const catLink = document.querySelector('.cat-links a');
        if (catLink) {
            catLink.textContent = post.category;
            catLink.href = `blog.html?category=${post.category.toLowerCase()}`;
        }

        this.updateSidebar(posts);
    },

    updateSidebar(posts) {
        const recentList = document.querySelector('.bwp-recent-post .row');
        if (recentList) {
            recentList.innerHTML = posts.slice(0, 3).map(post => `
                <div class="post-grid col-xl-12 col-lg-12 col-md-12 col-12">
                    <div class="item">
                        <a class="post-thumbnail" href="blog-details.html?post=${post.slug}">
                            <img width="500" height="500" src="${post.image}" class="attachment-rappod-blog-sidebar size-rappod-blog-sidebar wp-post-image" alt="">
                        </a>
                        <div class="post-content">
                            <span class="entry-date">${post.date}</span>
                            <h2 class="entry-title"><a href="blog-details.html?post=${post.slug}">${post.title}</a></h2> 
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('blog-details.html')) {
        blogManager.initDetails();
    } else if (window.location.pathname.includes('blog.html')) {
        blogManager.initBlog();
    }
});
