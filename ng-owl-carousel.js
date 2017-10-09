angular.module('ngOwlCarousel', [])

        .directive('owlCarousel', ['$timeout', '$compile', function ($timeout, $compile) {
                return {
                    scope: {
                        config: "=",
                        methods: "=?"
                    },
                    restrict: 'EA',
                    link: function ($scope, element, attr) {
                        element.hide();

                        var owl = element.next('.owl-carousel');

                        if (!owl.length) {
                            owl = angular.element("<div class='owl-carousel'></div>").insertAfter(element);
                        }

                        $scope.$watch(function () {
                            return attr.owlId
                        }, function (value) {
                            if (value && value.length) {
                                owl.attr('id', attr.owlId)
                            } else {
                                owl.removeAttr('id');
                            }
                        })

                        $scope.$watch('config', function (value) {
                            owl.trigger('destroy.owl.carousel');
                            owl.owlCarousel(value)
                        })

                        $scope.$watch(function () {
                            return element.html();
                        }, function (value) {
                            owl.trigger('replace.owl.carousel', value).trigger('refresh.owl.carousel');
                        });

                        $scope.$on('$destroy', function () {
                            owl.trigger('destroy.owl.carousel');
                        })

                    },
                }
            }
        ])