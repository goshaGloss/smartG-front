import React from 'react'
export const ScrollWrapper = (TargetComponent) => {
    class ScrollWrapperClass extends React.Component{
        componentWillMount() {
            window.scrollTo(0,0);
        }

        render(){
            return <>
                <TargetComponent/>
                </>
        }
    }
    return ScrollWrapperClass;
}