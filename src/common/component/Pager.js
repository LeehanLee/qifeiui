
import React, { Component } from 'react';
import Button from "./Button";

const pageSizeOptions = [2, 10, 20, 50];

class Pager extends Component{
    constructor(props) {
        super(props);
        this.handlePagerClick = this.handlePagerClick.bind(this);
        this.handlePageSizeOptionClick = this.handlePageSizeOptionClick.bind(this);
    }

    handlePagerClick(page) {
        this.props.onPagerClicked(page, this.props.pageSize);
    }

    handlePageSizeOptionClick(pageSize) {
        this.props.onPagerClicked(1, pageSize);
    }

    renderPageSizeOption() {
        const result = [];
        const {pageSize} = this.props;
        pageSizeOptions.forEach((size) => {
            const classname = pageSize === size ? "page-size-option current-option" : "page-size-option";
            result.push(<button onClick={_.partial(this.handlePageSizeOptionClick, size)} key={`size${size}`} className={classname}>{size}</button>);
        });
        
        return (<div className="page-size-container">
            <span>每页显示</span>
            {result}
            <span>条</span>
        </div>);
    }
    renderPagerButton() {
        const {pageSize, page, totalCount} = this.props;
        let pageCount = parseInt(totalCount / pageSize);
        if (totalCount % pageSize !== 0) {
            pageCount++;
        }
        const result = [];
        if (page > 1) {
            result.push(<button onClick={_.partial(this.handlePagerClick, 1)} key="first" className="pager-item">首页</button>);
            result.push(<button onClick={_.partial(this.handlePagerClick, page - 1)} key="prev" className="pager-item">上一页</button>);
        }

        if (page - 1 >= 3) {
            result.push(<button key="prev..." className="pager-item">...</button>);
        }
        
        for(let i = 1; i <= pageCount; i++) {
            if (i >= page - 2 && i <= page + 2) {
                const classname = page === i ? "pager-item current-page" : "pager-item";
                result.push(<button onClick={_.partial(this.handlePagerClick, i)} key={`page${i}`} className={classname}>{i}</button>);
            }
        }

        if (pageCount - page >= 3) {
            result.push(<button key="next..." className="pager-item">...</button>);
        }

        if (page < pageCount) {
            result.push(<button onClick={_.partial(this.handlePagerClick, page + 1)} key="next" className="pager-item">下一页</button>);
            result.push(<button onClick={_.partial(this.handlePagerClick, pageCount)} key="last" className="pager-item">尾页</button>);
        }
        return (<div className="page-container">{result}</div>);
    }

    render(){
        if (this.props.totalCount <= 0) {
            return null;
        }

        return (<div className="pager-container clearfix">
            {this.renderPagerButton()}
            {this.renderPageSizeOption()}
        </div>);
    }
}
Pager.defaultProps = {
    totalCount: 0,
    page: 1,
    pageSize: 10
};
export default Pager;