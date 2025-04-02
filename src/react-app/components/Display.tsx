import { Display } from "@library/index"

export function DisplayUI({ displays }: { displays: Display[] }) {
	return (
		<div>
			{displays.map((display, index) => (
				<div key={index}>
			
					<div>
						<h3>📺 Display: {display.hwid}</h3>
						<ul>
							<li>
								<p>Height: {display.calibration?.screenH}</p>
							</li>
							<li>
								<p>Width: {display.calibration?.screenW}</p>
							</li>
							<li>
								<p>Serial: {display.calibration?.serial}</p>
							</li>
						</ul>
					</div>
				</div>
			))}
		</div>
	)
}
