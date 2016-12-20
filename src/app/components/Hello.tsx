import * as React from 'react';

export interface IHelloProps {
    name: string;
}

export default class Hello extends React.Component<IHelloProps, any> {
    constructor(props: IHelloProps) {
        super(props);
    }

    render() {
        return <p>Hello, {this.props.name}!</p>;
    }
}
