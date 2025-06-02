// GitHub API configuration
const GITHUB_TOKEN = '';

// Project repository information
const projects = [
    {
        name: 'SpotiStats',
        repo: 'Av1Sharma/SpotiStats',
        element: document.querySelector('a[href="/projects/spotistats.html"]')
    },
    {
        name: 'F1 Telemetry',
        repo: 'Av1Sharma/F1-Telemetry-App',
        element: document.querySelector('a[href="/projects/f1.html"]')
    },
    {
        name: 'BAAP Website',
        repo: 'bhsavionics/bhsavionics.github.io',
        element: document.querySelector('a[href="/projects/baap.html"]')
    },
    {
        name: 'FRC Scouting App',
        repo: 'Av1Sharma/FRC-ScoutingApp',
        element: document.querySelector('a[href="/projects/QSTAR.html"]')
    },
    {
        name: 'Betterness',
        repo: 'Av1Sharma/Betterness',
        element: document.querySelector('a[href="/projects/betterness.html"]')
    },
    {
        name: 'Marina FRC',
        repo: 'COMET-FRC/C2025-Reefscape',
        element: document.querySelector('a[href="/projects/Marina-frc.html"]')
    },
    {
        name: 'Melody FRC',
        repo: 'COMET-FRC/Melody',
        element: document.querySelector('a[href="/projects/Melody-frc.html"]')
    },
    {
        name: 'ToDo Public',
        repo: 'Av1Sharma/ToDo',
        element: document.querySelector('a[href="/projects/todo-public.html"]')
    }
];

// Function to fetch the latest commit date for a repository
async function getLatestCommitDate(owner, repo) {
    try {
        console.log(`\nFetching commit date for ${owner}/${repo}`);
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        
        // Check rate limit headers
        const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
        const rateLimitReset = response.headers.get('x-ratelimit-reset');
        
        if (!response.ok) {
            console.error(`❌ Failed to fetch commit data for ${owner}/${repo}: ${response.status}`);
            if (response.status === 403) {
                console.error(`⚠️ Rate limit info - Remaining: ${rateLimitRemaining}, Reset: ${new Date(rateLimitReset * 1000).toLocaleString()}`);
            }
            return new Date(0);
        }

        const commits = await response.json();
        if (!commits || commits.length === 0) {
            console.error(`❌ No commits found for ${owner}/${repo}`);
            return new Date(0);
        }
        const date = new Date(commits[0].commit.author.date);
        console.log(`✅ Latest commit date for ${owner}/${repo}: ${date.toLocaleString()}`);
        return date;
    } catch (error) {
        console.error(`❌ Error fetching commit date for ${owner}/${repo}:`, error);
        return new Date(0);
    }
}

// Function to sort and reorder projects
async function sortProjects() {
    console.log('\n🚀 Starting project sorting...');
    const projectGrid = document.querySelector('#projects .grid');
    if (!projectGrid) {
        console.error('❌ Project grid not found');
        return;
    }

    // Get commit dates for all projects
    console.log('\n📅 Fetching commit dates...');
    const projectsWithDates = await Promise.all(
        projects.map(async (project) => {
            if (!project.element) {
                console.error(`❌ Element not found for project: ${project.name}`);
                return { ...project, date: new Date(0) };
            }
            const [owner, repo] = project.repo.split('/');
            const date = await getLatestCommitDate(owner, repo);
            return { ...project, date };
        })
    );

    // Sort projects by date (newest first)
    console.log('\n🔄 Sorting projects by date...');
    projectsWithDates.sort((a, b) => b.date - a.date);

    // Log the sorted order
    console.log('\n📊 Sorted project order:');
    projectsWithDates.forEach((project, index) => {
        console.log(`${index + 1}. ${project.name} - Last commit: ${project.date.toLocaleString()}`);
    });

    // Reorder projects in the DOM
    console.log('\n📝 Reordering projects in DOM...');
    projectsWithDates.forEach(project => {
        if (project.element) {
            projectGrid.appendChild(project.element);
            console.log(`✅ Moved ${project.name} to position ${projectGrid.children.length}`);
        }
    });
    console.log('\n✨ Project sorting complete');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sortProjects);
} else {
    sortProjects();
} 