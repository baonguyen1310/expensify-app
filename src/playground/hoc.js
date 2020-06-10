import React from 'react';
import ReactDOM from  'react-dom';

const Info = (props) =>(
    <div>
        <p>
            This is info. { props.title }
        </p>
    </div>
);


const Hoc = (WarrpedComponent) =>{
    return (props) =>(
        <div>
            <p>Warning</p>
            <WarrpedComponent {...props}/>
        </div>
    )
}
const HocInfo = Hoc(Info);
ReactDOM.render(<HocInfo title = 'For HOC component.'></HocInfo>,document.getElementById('app'))