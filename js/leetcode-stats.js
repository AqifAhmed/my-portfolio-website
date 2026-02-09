document.addEventListener('DOMContentLoaded', () => {
    const leetCodeUsername = 'AqifAhmed';
    const apiUrl = `https://alfa-leetcode-api.onrender.com/${leetCodeUsername}/solved`;
    const solvedCountElement = document.getElementById('leetcode-solved');
    const badgeContainer = document.getElementById('leetcode-badge');

    if (!solvedCountElement || !badgeContainer) return;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.solvedProblem !== undefined) {
                solvedCountElement.textContent = data.solvedProblem;
                badgeContainer.classList.remove('d-none'); // Show badge if hidden by default

                // Animate the number
                gsap.from(solvedCountElement, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: 1 },
                    stagger: 1,
                });
            }
        })
        .catch(error => {
            console.error('Error fetching LeetCode stats:', error);
            solvedCountElement.textContent = 'Profile'; // Fallback text
        });
});
