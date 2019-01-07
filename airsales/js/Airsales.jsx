class Airsales extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tickets: this.getTickets(),
            currency: this.currencySign('RUB')
        }

        this.convertPrice = this.convertPrice.bind(this)
        this.getCurrency = this.getCurrency.bind(this)
        this.getStops = this.getStops.bind(this)
    }

    getTickets() {
        let xhttp = new XMLHttpRequest()
        xhttp.open('GET', 'https://raw.githubusercontent.com/KosyanMedia/test-tasks/master/aviasales/tickets.json', false);
        xhttp.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                return this
            }
        }

        xhttp.send()
        return JSON.parse(xhttp.response).tickets
    }

    convertPrice(currency) {
        const convert = (curr, price) => {
            switch (curr) {
                case 'RUB':
                    return price;
                case 'USD':
                    return Math.round(price * 0.015);
                case 'EUR':
                    return Math.round(price * 0.013);
            }
        }

        const prices = this.getTickets().map(ticket => {
            return Object.assign({}, ticket, {
                price: convert(currency, ticket.price)
            })
        })

        this.setState(
            {
                tickets: prices,
                currency: this.currencySign(currency)
            }
        )
    }

    currencySign(curr) {
        return curr == 'RUB' ? '₽' : (curr == 'USD' ? '$' : '€');
    }

    getCurrency() {
        return this.state.currency
    }

    getStops(stop) {
        if (stop == undefined) {
            return this.setState({
                tickets: this.getTickets()
            });
        }

        let stops = this.getTickets().map(ticket => {
            return ticket.stops == stop ? ticket : undefined
        })

        stops = stops.filter(ticket => ticket != undefined)

        this.setState({
            tickets: stops
        });
    }



    render() {
        const tickets = this.state.tickets.sort((first, second) => {
            return second.price - first.price
        })

        const airsalesTickets = tickets.map(ticket => {
            return (
                <AirsalesList
                    origin={ticket.origin}
                    origin_name={ticket.origin_name}
                    destination={ticket.destination}
                    destination_name={ticket.destination_name}
                    departure_date={ticket.departure_date}
                    departure_time={ticket.departure_time}
                    arrival_date={ticket.arrival_date}
                    arrival_time={ticket.arrival_time}
                    carrier={ticket.carrier}
                    stops={ticket.stops}
                    price={ticket.price}
                    currency={this.getCurrency}
                />
            )
        })
        return (
            <div className="container" >
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <img src="logo.svg" alt="logo" className="img p-5" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-12 bg-white p-4 rounded h-25" id="filter">
                        <Filter
                            onClick={this.convertPrice}
                            onCheck={this.getStops}
                        />
                    </div>
                    <div className="col-lg-8 com-sm-12" id="airsales">
                        {airsalesTickets}
                    </div>
                </div>
            </div>
        )
    }
}

class Filter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h4 className="mb-4">ВАЛЮТА</h4>
                <div className="btn-group btn-group-toggle mb-4" data-toggle="button">
                    <button className="btn btn-outline-primary " onClick={() => { this.props.onClick('RUB') }} name="options" id="rub">RUB</button>
                    <button className="btn btn-outline-primary" onClick={() => { this.props.onClick('USD') }} id="usd">USD</button>
                    <button className="btn btn-outline-primary" onClick={() => { this.props.onClick('EUR') }} id="eur">EUR</button>
                </div>
                <h4 className="mb-3">КОЛИЧЕСТВО ПЕРЕСАДОК</h4>
                <div className="list-group">
                    <li className="list-group-item"><input type="checkbox" onChange={() => { this.props.onCheck() }} /><span className="pl-3">Все</span></li>
                    <li className="list-group-item"><input type="checkbox" onChange={() => { this.props.onCheck(0) }} /><span className="pl-3">Без пересадок</span></li>
                    <li className="list-group-item"><input type="checkbox" onChange={() => { this.props.onCheck(1) }} /><span className="pl-3">1 пересадка</span></li>
                    <li className="list-group-item"><input type="checkbox" onChange={() => { this.props.onCheck(2) }} /><span className="pl-3">2 пересадки</span></li>
                    <li className="list-group-item"><input type="checkbox" onChange={() => { this.props.onCheck(3) }} /><span className="pl-3">3 пересадки</span></li>
                </div>
            </div>
        )
    }
}


class AirsalesList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row bg-white p-4 ml-4 mb-4 rounded" id="avs_root">
                <div className="col-3 border-right">
                    <img src="../img/ta_logo.svg" className="img-fluid mb-3"></img>
                    <button className="btn btn-primary">
                        Купить <br /> за {this.props.price}{this.props.currency()}
                    </button>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-around">
                            <h3>{this.props.departure_time}</h3>
                            <div className="d-flex flex-column">
                                <span className="avs_stops">{this.props.stops ? `${this.props.stops} ПЕРЕСАДКИ` : ''}</span>
                                <img src="../img/fly.svg" className="img-fluid"></img>
                            </div>
                            <h3>{this.props.arrival_time}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <div>
                                <h5>{`${this.props.origin}, ${this.props.origin_name}`}</h5>
                                <h6 className="avs_date">{this.props.departure_date}</h6>
                            </div>
                            <div>
                                <h5>{`${this.props.destination}, ${this.props.destination_name}`}</h5>
                                <h6 className="avs_date">{this.props.arrival_date}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


ReactDOM.render(<Airsales />, document.getElementById('root'))