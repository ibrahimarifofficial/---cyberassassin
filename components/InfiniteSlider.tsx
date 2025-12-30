'use client'

const sliderItems = [
  { text: 'Threat Detection' },
  { text: 'Data Protection' },
  { text: 'Network Security' },
  { text: 'Zero Trust Security' },
  { text: 'Cyber Defense' },
  { text: 'Risk Management' },
]

export default function InfiniteSlider() {
  return (
    <div className="infinite-slider">
      <div className="infinite-slider__track">
        {[...sliderItems, ...sliderItems].map((item, index) => (
          <div key={index} className="infinite-slider__item">
            <svg className="infinite-slider__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L3 7L3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12L21 7L12 2Z"/>
              <path d="M12 8L12 12L16 12"/>
            </svg>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


