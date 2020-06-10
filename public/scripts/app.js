"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        React.createElement(
            "h2",
            null,
            props.subTitle
        )
    );
};
var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.acOption,
                disabled: !props.hasOptions
            },
            "What Should I Do ?"
        )
    );
};
var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.hasRemoveAll },
            "Remove All"
        ),
        props.options.length === 0 && React.createElement(
            "p",
            null,
            "Please add options"
        ),
        props.options.map(function (item) {
            return React.createElement(Option, { key: item, optionValue: item, handleRemove: props.handleRemove });
        })
    );
};
var Option = function Option(props) {
    return React.createElement(
        "div",
        null,
        props.optionValue,
        React.createElement(
            "button",
            {
                onClick: function onClick(e) {
                    props.handleRemove(props.optionValue);
                }
            },
            "Remove"
        )
    );
};
// class Header extends React.Component {
//     render(){
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subTitle}</h2>
//             </div>
//         );
//     }
// }

// class Action extends React.Component{

//     render(){
//         return (
//             <div>
//                 <button onClick={this.props.acOption}
//                 disabled = {!this.props.hasOptions}
//             >
//                 What Should I Do ?
//             </button>
//             </div>
//         );
//     }
// }

// class Options extends React.Component {
//     render (){
//         return (
//             <div>
//                 <button  onClick={this.props.hasRemoveAll}>Remove All</button>
//                 {this.props.options.map((item)=> <Option key={item} optionValue = {item}/>)}
//             </div>
//         );
//     }
// }
// class Option extends React.Component{
//     render(){
//         return(
//             <div>
//                {this.props.optionValue}
//             </div>
//         );
//     }
// }

var AddOption = function (_React$Component) {
    _inherits(AddOption, _React$Component);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this.handleOption = _this.handleOption.bind(_this);
        _this.state = {
            error: undefined
        };
        return _this;
    }

    _createClass(AddOption, [{
        key: "handleOption",
        value: function handleOption(e) {
            e.preventDefault();
            var data = e.target.elements.bao.value.trim();
            var error = this.props.handleCreateOption(data);

            this.setState(function () {
                return { error: error };
            });
            if (!error) {
                e.target.elements.bao.value = '';
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleOption },
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", { type: "text", name: "bao" }),
                    this.state.error && React.createElement(
                        "p",
                        null,
                        this.state.error
                    ),
                    React.createElement(
                        "button",
                        null,
                        "Add Option"
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

var Indecision = function (_React$Component2) {
    _inherits(Indecision, _React$Component2);

    function Indecision(props) {
        _classCallCheck(this, Indecision);

        var _this2 = _possibleConstructorReturn(this, (Indecision.__proto__ || Object.getPrototypeOf(Indecision)).call(this, props));

        _this2.removeAll = _this2.removeAll.bind(_this2);
        _this2.handlePick = _this2.handlePick.bind(_this2);
        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.removeOption = _this2.removeOption.bind(_this2);
        _this2.state = {
            options: []
        };
        return _this2;
    }

    _createClass(Indecision, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('optionData');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return {
                            options: options
                        };
                    });
                }
            } catch (e) {}
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(props, preSate) {
            var isValid = this.state.options.length != preSate.options.length;
            if (isValid) {
                var jsonData = JSON.stringify(this.state.options);
                localStorage.setItem('optionData', jsonData);
            }
        }
    }, {
        key: "removeAll",
        value: function removeAll() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "removeOption",
        value: function removeOption(optionToRemove) {
            this.setState(function (preSate) {
                return {
                    options: preSate.options.filter(function (option) {
                        return option !== optionToRemove;
                    })
                };
            });
        }
    }, {
        key: "handlePick",
        value: function handlePick() {
            var option = Math.floor(Math.random() * this.state.options.length);
            var itemOption = this.state.options[option];
            alert(itemOption);
        }
    }, {
        key: "handleAddOption",
        value: function handleAddOption(option) {
            if (!option) {
                return 'Please input value';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'Item already exist';
            }
            this.setState(function (preSate) {
                return { options: preSate.options.concat([option]) };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var title = "Indecision React App";
            var subTitle = 'Put you life in hand of React.';
            return React.createElement(
                "div",
                null,
                React.createElement(Header, { title: title, subTitle: subTitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    acOption: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    hasRemoveAll: this.removeAll,
                    handleRemove: this.removeOption
                }),
                React.createElement(AddOption, { handleCreateOption: this.handleAddOption })
            );
        }
    }]);

    return Indecision;
}(React.Component);

ReactDOM.render(React.createElement(Indecision, null), document.getElementById('app'));
