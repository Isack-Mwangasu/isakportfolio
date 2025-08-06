import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const animationRef = useRef()
	const elementsRef = useRef([])

	useEffect(() => {
		// Cache DOM elements
		elementsRef.current = [
			document.querySelector(".floating-shape-1"),
			document.querySelector(".floating-shape-2"),
			document.querySelector(".floating-shape-3"),
			document.querySelector(".floating-shape-4"),
		].filter(Boolean) // Remove null elements

		let ticking = false

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					elementsRef.current.forEach((element, index) => {
						if (element) {
							const speed = (index + 1) * 0.5
							const offset = window.pageYOffset * speed
							element.style.transform = `translateY(${offset}px)`
						}
					})
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true })

		return () => {
			window.removeEventListener("scroll", handleScroll)
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			<div className="floating-shape-1 absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
			<div className="floating-shape-2 absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
			<div className="floating-shape-3 absolute bottom-40 left-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"></div>
			<div className="floating-shape-4 absolute bottom-20 right-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl"></div>
		</div>
	)
}

export default AnimatedBackground

