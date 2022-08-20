$(document).ready(function () {
    $(document).on('click', '#return-to-top', function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

    var myBanner = new Swiper('#logistic-banner', {
        loop: true,
        spaceBetween: 50,
        speed: 250,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    })
    var myBlog = new Swiper('#logistic-blog', {
        slidesPerView: 3,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    <!-- Source mới 21-07-2021 -->
    $('[data-toggle="popover"]').popover({trigger: "manual", html: true, animation: true})
        .on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(".popover").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
    });

    const imageNav = new Swiper('#preview-images-nav', {
        spaceBetween: 10,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                direction: "horizontal",
            },
            768: {
                direction: "vertical",
            },
        }
    });
    const imageAvatar = new Swiper('#preview-images-avatar', {
        thumbs: {
            swiper: imageNav,
        },
    });

    let windowWidth = $(window).width();

    const handleTouchMoveNavigation = function (ev) {
        if (!$(ev.target).closest('#header-navigation').length) {
            ev.preventDefault();
        }
    }

    const handleHeaderMobile = () => {
        if (windowWidth < 992) {
            let elmBody = $('body'),
                elmHamburger = $('#header-hamburger'),
                elmNavigation = $('#header-navigation'),
                elmOverlay = $('#header-overlay'),
                elmCloseNavigation = $('#header-navigation_close');

            elmNavigation.find('ul > li > ul > li').map(function (index) {
                $(this).parent().prev('a').attr({
                    'data-toggle': 'collapse',
                    'data-target': "#header-sub_" + index,
                });
                $(this).parent().attr({
                    "id": "header-sub_" + index,
                    "class": "navigation-sub collapse",
                    "data-parent": "#header-navigation"
                });
            });

            elmHamburger.click(function () {
                if (elmBody.hasClass('is-show_navigation')) {
                    elmBody.attr({
                        'class': '',
                        'style': ''
                    });
                    document.removeEventListener('touchmove', handleTouchMoveNavigation);
                    elmNavigation.find('.collapse').collapse('hide');
                } else {
                    document.addEventListener('touchmove', handleTouchMoveNavigation, {passive: false});
                    elmBody.attr({
                        'class': 'is-show_navigation',
                        'style': 'overflow-y: hidden'
                    });
                }
            });

            elmOverlay.add(elmCloseNavigation).click(() => {
                elmHamburger.trigger('click')
            });
        }
    }

    handleHeaderMobile();
})
