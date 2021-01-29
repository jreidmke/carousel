import Card from './Card';
import { render } from '@testing-library/react';

it("renders without crashing", () => {
    render(<Card/>)
})

it('matches snapshot', () => {
    const {asFragment} = render(<Card/>);
    expect(asFragment()).toMatchSnapshot();
})