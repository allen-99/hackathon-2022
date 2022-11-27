import React from 'react';


class SecondCard extends React.Component {

    constructor(props) {
        super(props);

        this.touchDown = this.touchDown.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.paint = this.paint.bind(this);
    }

    touchDown(e) {
        const position = {
            left: this.marker.offsetLeft,
            top: this.marker.offsetTop
        };

        this.hitOffset = {
            x: e.pageX - position.left,
            y: e.pageY - position.top,
            diameter: this.diameter(),
            markerRadius: 10
        };
        this.marker.addEventListener('touchmove', this.touchMove);
        this.marker.addEventListener('touchstart', this.touchStart);
        this.marker.addEventListener('touchdown', this.touchDown);
        e.preventDefault();
    }

    touchMove(e) {
        this.position = {
            x: e.pageX - this.hitOffset.x,
            y: e.pageY - this.hitOffset.y
        };
        this.position.x = Math.round(this.position.x);
        this.position.y = Math.round(this.position.y);

        this.position.x = Math.min(700 - 1, Math.max(0, this.position.x));
        this.position.y = Math.min(700 - 1, Math.max(0, this.position.y));

        this.paint();
    }

    touchStart(e) {
        this.marker.removeEventListener('touchmove', this.touchMove);
        this.marker.removeEventListener('touchstart', this.touchStart);
        this.marker.removeEventListener('touchdown', this.touchDown);
    }

    diameter() {
        return 1;
    }

    paint() {
        if (JSON.stringify(this.paintedPosition) !== JSON.stringify(this.position)) {
            this.paintedPosition = Object.assign({}, this.position);
        }

        if (this.position) {
            this.marker.style.left = `${100 * this.position.x / 700}%`;
            this.marker.style.top = `${100 * this.position.y / 700}%`;
        }
        return this;
    }

    render() {
        this.position = this.position || {
            x: 100,
            y: 100
        };
        this.offset = 0;
        return <div className='outer'
                    ref = {ref => {
                        this.canvasRef = ref;
                    }}
        >
            <div className = 'marker'
                 touchDown = {event => this.touchDown(event)}
                 ref = {ref => {
                     this.marker = ref;
                 }} >
            </div>
        </div>;
    }

}

export default SecondCard;