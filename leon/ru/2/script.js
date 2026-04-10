document.addEventListener('DOMContentLoaded', function () {
	// Mobile Menu
	const burgerBtn = document.getElementById('burgerBtn')
	const mobileMenu = document.getElementById('mobileMenu')
	const mobileMenuOverlay = document.getElementById('mobileMenuOverlay')
	const burgerIcon = document.getElementById('burgerIcon')
	const closeIcon = document.getElementById('closeIcon')

	function toggleMobileMenu() {
		const isOpen = mobileMenu.classList.contains('open')

		if (isOpen) {
			mobileMenu.classList.remove('open')
			burgerIcon.classList.remove('hidden')
			closeIcon.classList.add('hidden')
			document.body.style.overflow = ''
		} else {
			mobileMenu.classList.add('open')
			burgerIcon.classList.add('hidden')
			closeIcon.classList.remove('hidden')
			document.body.style.overflow = 'hidden'
		}
	}

	if (burgerBtn) {
		burgerBtn.addEventListener('click', toggleMobileMenu)
	}

	if (mobileMenuOverlay) {
		mobileMenuOverlay.addEventListener('click', toggleMobileMenu)
	}

	// FAQ Accordion
	const faqItems = document.querySelectorAll('.faq-item')

	faqItems.forEach(function (item) {
		const question = item.querySelector('.faq-question')

		question.addEventListener('click', function () {
			const isActive = item.classList.contains('active')

			// Close all items
			faqItems.forEach(function (faqItem) {
				faqItem.classList.remove('active')
			})

			// Open clicked item if it wasn't active
			if (!isActive) {
				item.classList.add('active')
			}
		})
	})

	// Games Carousel
	const games = [
		{
			name: 'Royalty of Olympus',
			provider: 'Pragmatic Play',
			gradient: 'gradient-indigo',
			img: 'img/RoyaltyofOlympus@513x767@x2.webp',
		},
		{
			name: 'Barbarossa Revenge',
			provider: 'Belatra',
			gradient: 'gradient-red',
			img: 'img/Barbarossarevenge@513x767@x2.webp',
		},
		{
			name: 'Clover Coins 3x3',
			provider: 'Belatra',
			gradient: 'gradient-green',
			img: 'img/Clover_Coin@513x767@x2.webp',
		},
		{
			name: '3 Hot Teapots',
			provider: '3 Oaks Gaming',
			gradient: 'gradient-orange',
			img: 'img/3HotTeapots@513x767@x2.webp',
		},
		{
			name: 'Triple Fortune',
			provider: 'Evoplay',
			gradient: 'gradient-yellow',
			img: 'img/TripleFortune@513x767-1@x2.webp',
		},
		{
			name: '3 Gates Pyramid',
			provider: 'Belatra',
			gradient: 'gradient-amber',
			img: 'img/3GatesofPyramid@513x767@x2.webp',
		},
		{
			name: 'Moon Girls',
			provider: 'Belatra',
			gradient: 'gradient-pink',
			img: 'img/MoonGirls@513x767@x2.webp',
		},
		{
			name: 'Sweet Bonanza',
			provider: 'Pragmatic Play',
			gradient: 'gradient-pink',
			img: 'img/SweetBonanza1@4x-1@x2.webp',
		},
		{
			name: 'Big Bass Bonanza',
			provider: 'Pragmatic Play',
			gradient: 'gradient-blue',
			img: 'img/BigBassBonanza@4x@x2.webp',
		},
		{
			name: 'Sugar Rush',
			provider: 'Pragmatic Play',
			gradient: 'gradient-pink',
			img: 'img/SugarRush@513x767@x2.webp',
		},
		{
			name: 'Gates of Olympus',
			provider: 'Pragmatic Play',
			gradient: 'gradient-yellow',
			img: 'img/GatesOfOlympus2@4x@x2.webp',
		},
		{
			name: 'Starlight Princess',
			provider: 'Pragmatic Play',
			gradient: 'gradient-purple',
			img: 'img/StarlightPrincess@513x767@x2.webp',
		},
	]

	let currentIndex = 0
	const visibleCount = 6
	const carousel = document.getElementById('gamesCarousel')
	const prevBtn = document.getElementById('prevBtn')
	const nextBtn = document.getElementById('nextBtn')

	function renderGames() {
		if (!carousel) return

		let html = ''
		for (let i = 0; i < visibleCount; i++) {
			const game = games[(currentIndex + i) % games.length]
			html += `
        <a href="/click/" rel="nofollow" class="game-card">
          <div class="game-image ${game.gradient}">
            <img src="${game.img}" alt="${game.name}" />
            <div class="game-overlay">
              <span class="game-play-btn">Играть</span>
            </div>
            <div class="game-name-overlay">${game.name}</div>
          </div>
          <div class="game-provider">${game.provider}</div>
        </a>
      `
		}
		carousel.innerHTML = html
	}

	if (prevBtn) {
		prevBtn.addEventListener('click', function () {
			currentIndex = (currentIndex - 1 + games.length) % games.length
			renderGames()
		})
	}

	if (nextBtn) {
		nextBtn.addEventListener('click', function () {
			currentIndex = (currentIndex + 1) % games.length
			renderGames()
		})
	}

	// CTA Floating Coins Animation
	const ctaSection = document.getElementById('ctaSection')

	if (ctaSection) {
		function createCoin() {
			const coin = document.createElement('div')
			coin.className = 'cta-coin'
			coin.style.left = Math.random() * 100 + '%'
			coin.style.animationDuration = 3 + Math.random() * 4 + 's'
			coin.style.animationDelay = Math.random() * 2 + 's'

			const ctaContainer = ctaSection.querySelector('.cta-container')
			if (ctaContainer) {
				ctaContainer.appendChild(coin)

				setTimeout(function () {
					coin.remove()
				}, 7000)
			}
		}

		// Create coins periodically
		setInterval(createCoin, 800)
	}

	// Smooth reveal on scroll
	const observerOptions = {
		threshold: 0,
		rootMargin: '0px 0px 0px 0px',
	}

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1'
				entry.target.style.transform = 'translateY(0)'
				observer.unobserve(entry.target)
			}
		})
	}, observerOptions)

	// Observe sections for scroll animations
	document.querySelectorAll('.section').forEach(function (section) {
		section.style.opacity = '0'
		section.style.transform = 'translateY(20px)'
		section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
		observer.observe(section)
	})

	// Hero animation on load
	const heroText = document.querySelector('.hero-text')
	const heroCard = document.querySelector('.hero-card-wrapper')

	if (heroText) {
		heroText.style.opacity = '0'
		heroText.style.transform = 'translateY(30px)'
		heroText.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out'

		setTimeout(function () {
			heroText.style.opacity = '1'
			heroText.style.transform = 'translateY(0)'
		}, 100)
	}

	if (heroCard) {
		heroCard.style.opacity = '0'
		heroCard.style.transform = 'translateY(30px)'
		heroCard.style.transition =
			'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s'

		setTimeout(function () {
			heroCard.style.opacity = '1'
			heroCard.style.transform = 'translateY(0)'
		}, 100)
	}

	// Counter animation for CTA
	const counter = document.querySelector('.cta-counter')
	if (counter) {
		let value = 2847

		setInterval(function () {
			// Randomly increase or decrease by small amount
			const change = Math.floor(Math.random() * 20) - 10
			value = Math.max(2500, Math.min(3200, value + change))
			counter.textContent = value.toLocaleString()
		}, 3000)
	}
})
