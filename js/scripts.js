$(() => {
	// Страница товара
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs .swiper', {
			loop: false,
			speed: 500,
			spaceBetween: 10,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					slidesPerView: 4
				},
				480: {
					slidesPerView: 5
				},
				1024: {
					slidesPerView: 3
				}
			}
		})

		const productSlider = new Swiper('.product_info .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			thumbs: {
				swiper: productThumbs
			}
		})
	}


	// Карусель товаров
	const productsSliders = []

	$('.products .swiper').each(function (i) {
		$(this).addClass('products_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 1
				},
				480: {
					spaceBetween: 12,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 12,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 20,
					slidesPerView: 4
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})

	$('.product_info .features .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.product_info .features .hide').slideToggle(300)
	})


	// Товар в избранное
	$('.product .favorite_btn, .product_info .favorite_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Кастомный select
	$('select').niceSelect()


	// Боковая колонка - Категории
	$('.categories .main a.sub_link').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		if($(this).hasClass('active')){
			$('.categories .main a.sub_link').removeClass('active')
			$('.categories .sub').slideUp(300)
		} else {
			$('.categories .main a.sub_link').removeClass('active')
			$('.categories .sub').slideUp(300)

			$(this).toggleClass('active')
			parent.find('.sub').slideToggle(300)
		}
	})


	// Моб. кнопки
	$('.category_info .mob_btns .mob_categories_btn').click(function (e) {
		e.preventDefault()

		if($(this).hasClass('active')){
			$('.categories').slideUp(200)
			$(this).removeClass('active')
		} else {
			$('.filter').hide()
			$('.categories').slideDown(300)

			$('.category_info .mob_btns .btn').removeClass('active')
			$(this).addClass('active')
		}
	})

	$('.category_info .mob_btns .mob_filter_btn').click(function (e) {
		e.preventDefault()

		if($(this).hasClass('active')){
			$('.filter').slideUp(200)
			$(this).removeClass('active')
		} else {
			$('.categories').hide()
			$('.filter').slideDown(300)
			
			$('.category_info .mob_btns .btn').removeClass('active')
			$(this).addClass('active')
		}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent           = $(this).closest('.tabs_container'),
				  activeTab         = $(this).data('content'),
				  $activeTabContent = $(activeTab),
				  level             = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab        = $(`.tabs button[data-content="${locationHash}"]`),
			  $activeTabContent = $(locationHash),
			  $parent           = $activeTab.closest('.tabs_container'),
			  level             = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}


	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})
})