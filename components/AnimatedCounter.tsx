"use client";

import CountUp from 'react-countup'
const AnimatedCounter = ({ amount, duration=2, prefix }: AnimatedCounterProps) => {
    return (
        <div>
            <CountUp end={amount} prefix={prefix} duration={duration} decimals={2}/>
        </div>
    )
}

export default AnimatedCounter