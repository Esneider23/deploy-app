webpackHotUpdate(0,{

/***/ 103:
/*!*********************!*\
  !*** ./src/Home.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _jsxFileName = '/home/diego-hp/Documentos/universidad/6_semestre/arquitectura/project-front-end/src/Home.js';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(/*! react */ 88);

	var _react2 = _interopRequireDefault(_react);

	var _NavComponent = __webpack_require__(/*! ./components/NavComponent */ 104);

	var _NavComponent2 = _interopRequireDefault(_NavComponent);

	var _ImageSlider = __webpack_require__(/*! ./components/ImageSlider */ 121);

	var _ImageSlider2 = _interopRequireDefault(_ImageSlider);

	var _Footer = __webpack_require__(/*! ./components/Footer */ 122);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _steering = __webpack_require__(/*! ./assets/icons/steering-2.svg */ 128);

	var _steering2 = _interopRequireDefault(_steering);

	var _mapPin = __webpack_require__(/*! ./assets/icons/map-pin-2.svg */ 129);

	var _mapPin2 = _interopRequireDefault(_mapPin);

	var _handCoin = __webpack_require__(/*! ./assets/icons/hand-coin.svg */ 130);

	var _handCoin2 = _interopRequireDefault(_handCoin);

	var _stock = __webpack_require__(/*! ./assets/img/stock3.png */ 131);

	var _stock2 = _interopRequireDefault(_stock);

	var _BtnLight = __webpack_require__(/*! ./components/BtnLight */ 132);

	var _BtnLight2 = _interopRequireDefault(_BtnLight);

	__webpack_require__(/*! ./Home.css */ 135);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_Component) {
	  _inherits(Home, _Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {

	      var slides = [{ url: "https://i.imgur.com/8lxEjbX.png", title: "Slider 1" }, { url: "https://i.imgur.com/jP2wkJG.png", title: "Slider 2" }, { url: "https://i.imgur.com/Vgq0CTu.png", title: "Slider 2" }];

	      var containerStyles = {
	        width: "100%",
	        height: "480px",
	        background: "#FFF"
	      };

	      console.log(slides[0].url);

	      return _react2.default.createElement(
	        'div',
	        {
	          __source: {
	            fileName: _jsxFileName,
	            lineNumber: 31
	          },
	          __self: this
	        },
	        _react2.default.createElement(_NavComponent2.default, {
	          __source: {
	            fileName: _jsxFileName,
	            lineNumber: 32
	          },
	          __self: this
	        }),
	        _react2.default.createElement(
	          'div',
	          { style: containerStyles, __source: {
	              fileName: _jsxFileName,
	              lineNumber: 33
	            },
	            __self: this
	          },
	          _react2.default.createElement(_ImageSlider2.default, { slides: slides, __source: {
	              fileName: _jsxFileName,
	              lineNumber: 34
	            },
	            __self: this
	          })
	        ),
	        _react2.default.createElement(
	          'main',
	          { className: 'main-container', __source: {
	              fileName: _jsxFileName,
	              lineNumber: 37
	            },
	            __self: this
	          },
	          _react2.default.createElement(
	            'div',
	            { className: 'main__sections', __source: {
	                fileName: _jsxFileName,
	                lineNumber: 38
	              },
	              __self: this
	            },
	            _react2.default.createElement(
	              'a',
	              { href: '#Vehiculos', className: 'main__links', __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 39
	                },
	                __self: this
	              },
	              _react2.default.createElement(
	                'div',
	                { className: 'section', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 40
	                  },
	                  __self: this
	                },
	                _react2.default.createElement('img', { src: _steering2.default, alt: '', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 41
	                  },
	                  __self: this
	                }),
	                _react2.default.createElement(
	                  'h3',
	                  {
	                    __source: {
	                      fileName: _jsxFileName,
	                      lineNumber: 42
	                    },
	                    __self: this
	                  },
	                  'Nuestro catalog\xF3'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: '#About', className: 'main__links', __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 45
	                },
	                __self: this
	              },
	              _react2.default.createElement(
	                'div',
	                { className: 'section', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 46
	                  },
	                  __self: this
	                },
	                _react2.default.createElement('img', { src: _mapPin2.default, alt: '', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 47
	                  },
	                  __self: this
	                }),
	                _react2.default.createElement(
	                  'h3',
	                  {
	                    __source: {
	                      fileName: _jsxFileName,
	                      lineNumber: 48
	                    },
	                    __self: this
	                  },
	                  '\xBFDond\xE9 estamos?'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: '#Cotizar', className: 'main__links', __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 51
	                },
	                __self: this
	              },
	              _react2.default.createElement(
	                'div',
	                { className: 'section', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 52
	                  },
	                  __self: this
	                },
	                _react2.default.createElement('img', { src: _handCoin2.default, alt: '', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 53
	                  },
	                  __self: this
	                }),
	                _react2.default.createElement(
	                  'h3',
	                  {
	                    __source: {
	                      fileName: _jsxFileName,
	                      lineNumber: 54
	                    },
	                    __self: this
	                  },
	                  'Cotiza aqu\xED'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'h1',
	            { className: 'main__title', __source: {
	                fileName: _jsxFileName,
	                lineNumber: 58
	              },
	              __self: this
	            },
	            '\xA1Encuentra tu pr\xF3ximo veh\xEDculo!'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'main__vehicles', __source: {
	                fileName: _jsxFileName,
	                lineNumber: 60
	              },
	              __self: this
	            },
	            _react2.default.createElement(
	              'div',
	              { className: 'main__vehicle', __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 61
	                },
	                __self: this
	              },
	              _react2.default.createElement('img', { src: _stock2.default, alt: '', style: { width: "120px", height: "100px" }, __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 62
	                },
	                __self: this
	              }),
	              _react2.default.createElement(
	                'h3',
	                {
	                  __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 63
	                  },
	                  __self: this
	                },
	                'Toyota Corolla'
	              ),
	              _react2.default.createElement(
	                Link,
	                { href: 'link', className: 'main__links', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 64
	                  },
	                  __self: this
	                },
	                _react2.default.createElement(
	                  _BtnLight2.default,
	                  {
	                    __source: {
	                      fileName: _jsxFileName,
	                      lineNumber: 65
	                    },
	                    __self: this
	                  },
	                  'Ver m\xE1s'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'main__about', __source: {
	                fileName: _jsxFileName,
	                lineNumber: 70
	              },
	              __self: this
	            },
	            _react2.default.createElement(
	              'div',
	              { className: 'main__about--text', __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 71
	                },
	                __self: this
	              },
	              _react2.default.createElement(
	                'h2',
	                { id: 'About', __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 72
	                  },
	                  __self: this
	                },
	                '\xBFQu\xE9 es MotorShop?'
	              ),
	              _react2.default.createElement(
	                'p',
	                {
	                  __source: {
	                    fileName: _jsxFileName,
	                    lineNumber: 75
	                  },
	                  __self: this
	                },
	                'Exercitation sint ea amet pariatur quis nulla tempor esse qui eiusmod consectetur velit sunt aliqua. Pariatur officia ut ad dolor ipsum eiusmod. Nulla aliquip magna tempor nisi ullamco nostrud veniam sint occaecat ullamco proident cupidatat aliquip sit. Adipisicing id anim duis culpa cupidatat cillum qui amet proident.'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'main__about--img', __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 84
	                },
	                __self: this
	              },
	              _react2.default.createElement('img', { src: _stock2.default, alt: 'about', __source: {
	                  fileName: _jsxFileName,
	                  lineNumber: 85
	                },
	                __self: this
	              })
	            )
	          )
	        ),
	        _react2.default.createElement(_Footer2.default, {
	          __source: {
	            fileName: _jsxFileName,
	            lineNumber: 90
	          },
	          __self: this
	        })
	      );
	    }
	  }]);

	  return Home;
	}(_react.Component);

		exports.default = Home;

/***/ }

})
//# sourceMappingURL=0.6be22d1409b87a462d51.hot-update.js.map