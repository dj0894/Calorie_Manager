import '../css/tips-carousel.css'

function TipsCaraousel() {

    return (
        <div className="carrousel">
            <input type="radio" name="slides" id="radio-1" defaultChecked />
            <input type="radio" name="slides" id="radio-2" />
            <input type="radio" name="slides" id="radio-3" />
            <input type="radio" name="slides" id="radio-4" />
            <ul className="slides">
                <li className="slide">
                    <p>
                        <b>Drink Water, Especially Before Meals.</b>
                    </p>
                </li>
                <li className="slide">
                    <p>
                        <b>Try Intermittent Fasting.</b>

                    </p>
                </li>
                <li className="slide">
                    <p>
                        <b>Cut Back on Added Sugar.</b>
                    </p>
                </li>
                <li className="slide">
                    <p>
                        <b>Exercise daily for 10-30 minutes.</b>
                    </p>
                </li>
            </ul>
            <div className="slidesNavigation">
                <label htmlFor="radio-1" id="dotForRadio-1"></label>
                <label htmlFor="radio-2" id="dotForRadio-2"></label>
                <label htmlFor="radio-3" id="dotForRadio-3"></label>
                <label htmlFor="radio-4" id="dotForRadio-4"></label>
            </div>
        </div >
    )

}

export default TipsCaraousel