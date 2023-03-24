import React,{Component} from 'react';

class TOC extends Component{
    shouldComponentUpdate(newProps, newState){
        if (this.props.data === newProps.data){
            return false;
        }
        return true;
    }
    
    render(){
        var lists = [];
        var data = this.props.data;
        var i=0;
        while (i<data.length){
            lists.push(<li key={data[i].id}>
                <a href={"/contents/"+data[i].id}
                data-id1={data[i].id}
                onClick={function(e){
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id1);
                }.bind(this)}   
                >
                    {data[i].title}
                </a>
                </li>);
            i++;
        }
        return(
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        )
    }
}

export default TOC;     //TOC.js를 가져다쓰는 쪽에서 TOC 클래쓰를 가져다 쓸 수 있게됨.