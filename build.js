const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const frontMatter = require('front-matter');

// Configure marked for security
marked.setOptions({
    headerIds: false,
    mangle: false
});

// Read the template
const template = fs.readFileSync('blog/template.html', 'utf-8');

// Process all markdown files
async function buildPosts() {
    const postsDir = path.join(__dirname, 'blog', 'posts');
    const posts = [];

    // Read all markdown files
    const files = await fs.readdir(postsDir);
    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(path.join(postsDir, file), 'utf-8');
            const { attributes, body } = frontMatter(content);
            const html = marked(body);
            
            posts.push({
                title: attributes.title,
                date: attributes.date,
                content: html
            });
        }
    }

    // Sort posts by date
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generate HTML for each post
    const postsHtml = posts.map(post => `
        <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-2">${post.title}</h2>
            <div class="text-gray-600 dark:text-gray-400 mb-4">${post.date}</div>
            <div class="prose dark:prose-invert max-w-none">
                ${post.content}
            </div>
        </article>
    `).join('\n');

    // Replace the placeholder in the template
    const finalHtml = template.replace('{{POSTS}}', postsHtml);
    
    // Write the output
    await fs.writeFile('blog/index.html', finalHtml);
    console.log('Blog built successfully!');
}

buildPosts().catch(console.error); 