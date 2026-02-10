document.addEventListener('DOMContentLoaded', () => {
    const leetCodeUsername = 'AqifAhmed';
    const apiUrl = `https://alfa-leetcode-api.onrender.com/${leetCodeUsername}/solved`;

    // Elements
    const totalEl = document.getElementById('leetcode-total');
    const easyEl = document.getElementById('leetcode-easy');
    const mediumEl = document.getElementById('leetcode-medium');
    const hardEl = document.getElementById('leetcode-hard');

    const easyBar = document.getElementById('leetcode-easy-bar');
    const mediumBar = document.getElementById('leetcode-medium-bar');
    const hardBar = document.getElementById('leetcode-hard-bar');

    if (!totalEl) return;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data && data.solvedProblem !== undefined) {
                // Update Numbers
                totalEl.textContent = data.solvedProblem;
                easyEl.textContent = data.easySolved;
                mediumEl.textContent = data.mediumSolved;
                hardEl.textContent = data.hardSolved;

                // Update Progress Bars (assuming total questions roughly... or just relative to total solved? 
                // Creating a visual bar relative to total solved is nice, or relative to fixed numbers.
                // Let's use percentage of *solved* for the bar width to show distribution of effort.
                const total = data.solvedProblem > 0 ? data.solvedProblem : 1;
                easyBar.style.width = `${(data.easySolved / total) * 100}%`;
                mediumBar.style.width = `${(data.mediumSolved / total) * 100}%`;
                hardBar.style.width = `${(data.hardSolved / total) * 100}%`;

                // Animate Total
                gsap.from(totalEl, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: 1 }
                });
            }
        })
        .catch(error => {
            console.error('Error fetching LeetCode stats:', error);
            totalEl.textContent = '-';
        });
});
