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
                totalEl.textContent = data.solvedProblem !== undefined && data.solvedProblem !== null ? data.solvedProblem : 0;
                easyEl.textContent = data.easySolved !== undefined && data.easySolved !== null ? data.easySolved : 0;
                mediumEl.textContent = data.mediumSolved !== undefined && data.mediumSolved !== null ? data.mediumSolved : 0;
                hardEl.textContent = data.hardSolved !== undefined && data.hardSolved !== null ? data.hardSolved : 0;

                // Update Progress Bars
                const total = (data.solvedProblem !== undefined && data.solvedProblem !== null && data.solvedProblem > 0) ? data.solvedProblem : 1;
                easyBar.style.width = `${((data.easySolved || 0) / total) * 100}%`;
                mediumBar.style.width = `${((data.mediumSolved || 0) / total) * 100}%`;
                hardBar.style.width = `${((data.hardSolved || 0) / total) * 100}%`;

                // Animate Total
                gsap.from(totalEl, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: 1 }
                });
            } else {
                console.error('LeetCode API returned invalid data:', data);
                // Fallback if data is not as expected
                totalEl.textContent = '-';
                easyEl.textContent = '-';
                mediumEl.textContent = '-';
                hardEl.textContent = '-';
            }
        })
        .catch(error => {
            console.error('Error fetching LeetCode stats:', error);
            totalEl.textContent = '-';
            easyEl.textContent = '-';
            mediumEl.textContent = '-';
            hardEl.textContent = '-';
        });
});
