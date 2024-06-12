import { Display } from "@library/index"

export function DisplayUI({ displays }: { displays: Display[] }) {

	return (
		<div>
            {displays.map((display, index) => (
                <div key={index}>
                    <hr/>
                    <div>
                        <h3>📺Display: {display.hwid}</h3>
                            <ul>
                                <p>Height: {display.calibration?.screenH}</p>
                                <p>Width: {display.calibration?.screenW}</p>
                                <p>Serial: {display.calibration?.serial}</p>
                            </ul>
                            
                    </div>  
                    </div>
            ))}
			</div>
	)
}
