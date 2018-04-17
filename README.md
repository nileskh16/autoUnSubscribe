# AutoUnSubscribe
We are always using bunch of events to take few actions as a result of happening of something and subscribe to couple of Observables to collect data from them.
Yes, these subscriber do occupy space in memory and should be released of their space once we are done using them.
But also, doing so explicitly will cause lot of confusion.
Here, I have come up with a decorator which will un-subscribe all observables for you automatically reallocating the precious space they had confiscated earlier.

Installation

Please run the following command to install the module
npm install automatic-unsubscribe --save

Usage

import { AutoUnSubscribe } from 'automatic-unsubscribe';

@AutoUnSubscribe()
@Component({})
export class DemoClass {

}