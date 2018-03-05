angular.module('owlCarousel', [])

        .directive('owlCarousel', ['$timeout', '$compile', '$parse', function ($timeout, $compile, $parse) {
                return {
                    restrict: 'EA',
                    link: function ($scope, element, attr) {
                        element.hide();

                        var owl = element.next('.owl-carousel');

                        if (!owl.length) {
                            owl = angular.element("<div class='owl-carousel'></div>").insertAfter(element);
                        }

                        var methods = {
                            moveTo: function (index, speed) {
                                owl.trigger('to.owl.carousel', index, speed);
                                return this;
                            },
                            next: function () {
                                owl.trigger('next.owl.carousel');
                            },
                            prev: function () {
                                owl.trigger('prev.owl.carousel');
                            },
                            on: function (event, callback) {
                                owl.on(event, callback)
                                return this;
                            }
                        }

                        if (attr.owlMethods) {
                            $parse(attr.owlMethods).assign($scope, methods);
                        }

                        if (attr.owlInit) {
                            $scope.$eval(owlInit, {
                                $owl: owl
                            })
                        }

                        $scope.$watch(attr.owlId, function (value) {
                            if (value && value.length) {
                                owl.attr('id', value)
                            } else {
                                owl.removeAttr('id');
                            }
                        })

                        $scope.$watch(attr.config, function (value) {
                            owl.trigger('destroy.owl.carousel');
                            owl.owlCarousel(value);
                        })

                        $scope.$watch(function () {
                            return element.html();
                        }, function (value) {
                            _.forEach(element.children(), function (slide, index) {
                                slide.dataSet = {
                                    owlIndex: index
                                }
                            })
                            owl.trigger('replace.owl.carousel', [element.children()]).trigger('refresh.owl.carousel').trigger('to.owl.carousel', 0, 0);
                        });

                        if (attr.owlActiveSlide) {
                            $scope.$watch(attr.owlActiveSlide, function (value) {
                                if (value !== undefined) {
                                    methods.moveTo(value)
                                }
                            })
                        }
                    },
                }
            }
        ])
        .directive('owlNext', function () {
            return {
                restrict: 'AC',
                link: function ($scope, element, attr) {
                    element.on('click', function () {
                        angular.element('#' + attr.owlNext).trigger('next.owl.carousel');
                    })
                }
            }
        })
        .directive('owlPrev', function () {
            return {
                restrict: 'AC',
                link: function ($scope, element, attr) {
                    element.on('click', function () {
                        angular.element('#' + attr.owlPrev).trigger('prev.owl.carousel');
                    })
                }
            }
        })