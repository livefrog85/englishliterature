document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.paddingTop = null;
                content.style.paddingBottom = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '1rem';
                content.style.paddingBottom = '1rem';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Chart.js Logic
    const ctx = document.getElementById('themesChart');
    if(ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Individuality', 'Memory', 'Choice', 'Control', 'Emotion', 'Safety'],
                datasets: [{
                    label: 'Emphasis in Student Activities',
                    data: [85, 95, 90, 70, 80, 65],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(239, 68, 68, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(107, 114, 128, 0.6)',
                        'rgba(249, 115, 22, 0.6)',
                        'rgba(139, 92, 246, 0.6)'
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(107, 114, 128, 1)',
                        'rgba(249, 115, 22, 1)',
                        'rgba(139, 92, 246, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Thematic Importance Score'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Core Themes Explored in "The Giver"',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + ' / 100';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Debate section logic
    const showForBtn = document.getElementById('showForBtn');
    const showAgainstBtn = document.getElementById('showAgainstBtn');
    const forArguments = document.getElementById('forArguments');
    const againstArguments = document.getElementById('againstArguments');

    showForBtn.addEventListener('click', () => {
        forArguments.classList.toggle('hidden');
    });
    
    showAgainstBtn.addEventListener('click', () => {
        againstArguments.classList.toggle('hidden');
    });

    // Nav link active state on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    sections.forEach(section => {
        observer.observe(section);
    });
});