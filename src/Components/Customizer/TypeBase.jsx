import { Sketch } from "@uiw/react-color"
import { MdOutlineDone } from "react-icons/md"
import { Button, Dropdown } from "react-bootstrap"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

export const SelectColor = ({ color, onChange }) => {
    return (
        <div className={`${color?.title ? "flex-align gap-2" : ""}`}>
            {color?.title && <span className="w-100 fs-14">{color?.title}</span>}
            <Dropdown>
                <Dropdown.Toggle variant="success color-btn flex-between-align py-1 px-2 w-100" id="dropdown-basic">
                    <div className='flex-align gap-2 text-uppercase fs-14'>
                        <span style={{ background: `${color?.value}` }} />
                        {color?.value}
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className='p-0'>
                    <Dropdown.Item className='p-0' onClick={(e) => e.stopPropagation()}>
                        <Sketch
                            color={color?.value}
                            alpha={false}
                            onChange={(item) => {
                                return onChange(item)
                            }}
                        />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export const SelectDropdown = ({ data, title = null, selectedData, onSelect, dataType }) => {
    return (
        <div className="flex-align gap-2">
            {title && <span className="w-100 fs-14">{title}</span>}
            <Dropdown className="w-100">
                <Dropdown.Toggle variant="success color-btn flex-between-align py-1 px-2 w-100" id="dropdown-basic">
                    <div
                        className='flex-align gap-2 fs-14'
                        style={{ fontFamily: dataType == "font-family" ? selectedData?.value : "" }}
                    >
                        {
                            selectedData?.label?.length > 8
                                ? selectedData?.label.toString().slice(0, 8) + ".."
                                : selectedData?.label
                        }
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className='p-0'>
                    {
                        data?.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <Dropdown.Item
                                    className='fs-18 flex-between-align'
                                    key={index}
                                    onClick={() => {
                                        return onSelect(item)
                                    }}
                                    style={{ fontFamily: dataType == "font-family" ? item?.value : "" }}
                                >
                                    {item?.label}
                                    {
                                        item?.value == selectedData?.value &&
                                        <span><MdOutlineDone /></span>
                                    }
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export const RangeSlider = ({ data, title = null, selectedData, onSelect }) => {

    return (
        <div className="flex-align gap-2 pb-3">
            {title &&
                <span className="w-100 fs-14">{title}</span>
            }
            <Slider
                min={selectedData?.min}
                max={selectedData?.max}
                step={selectedData?.step}
                marks={selectedData?.marks}
                value={Number(selectedData?.value)}
                trackStyle={{ backgroundColor: 'darkgreen' }}
                dotStyle={{
                    backgroundColor: 'white',
                }}
                activeDotStyle={{
                    borderColor: "darkgreen",
                }}
                handleStyle={{
                    backgroundColor: "darkgreen",
                    borderColor: "darkgreen",
                    boxShadow: "none"
                }}
                onChange={(e) => {
                    return onSelect({
                        ...data,
                        value: e
                    })
                }}
            />
        </div>
    )
}

export const RangeSliderCustom = ({ data, onSelect }) => {

    return (
        <div className="flex-align gap-2 pb-3">
            {data?.title &&
                <span className="w-100 fs-14">{data?.title}</span>
            }
            <Slider
                min={data?.min}
                max={data?.max}
                step={data?.step}
                marks={data?.marks}
                value={Number(data?.value)}
                trackStyle={{ backgroundColor: 'darkgreen' }}
                dotStyle={{
                    backgroundColor: 'white',
                }}
                activeDotStyle={{
                    borderColor: "darkgreen",
                }}
                handleStyle={{
                    backgroundColor: "darkgreen",
                    borderColor: "darkgreen",
                    boxShadow: "none"
                }}
                onChange={(e) => {
                    return onSelect({
                        label: data?.label,
                        value: e
                    })
                }}
            />
        </div>
    )
}

export const ButtonList = ({ data, onSelect }) => {
    return (
        <label htmlFor={data?.label} className='d-grid gap-1'>
            <span>{data?.title ?? "title"}</span>
            <div className='flex-between-align half-border-rad gap-2 bg-secondary-subtle p-2'>
                {
                    data?.data?.length > 0 &&
                    data?.data.map((item, index) => {

                        return (
                            <Button
                                key={index}
                                variant={(data?.value == item?.value) ? 'light' : "transparent"}
                                className={`w-50 fs-14 py-1 bg-${(data?.value == item?.value) ? 'light' : "transparent"} text-capitalize`}
                                onClick={() => {
                                    return onSelect({
                                        label: data?.label,
                                        value: item?.value
                                    })
                                }}
                            >
                                {item?.label}
                            </Button>
                        )
                    })
                }
            </div>
        </label>
    )
}

export const Input = ({ data, onChange }) => {
    return (
        <label htmlFor={data?.label} className='d-grid gap-1'>
            <span className="text-capitalizer">{data?.title}</span>
            <input
                type="text"
                className='p-2 half-border-rad bg-transparent border border-secondary'
                placeholder={data?.placeholder}
                id={data?.label}
                value={data?.value}
                onChange={(e) => {
                    return onChange({
                        label: data?.label,
                        value: e?.target?.value
                    })
                }}
            />
        </label>
    )
}

export const Textarea = ({ data, onChange }) => {
    return (
        <label htmlFor={data?.label} className='d-grid gap-1'>
            <span className="text-capitalizer">{data?.title}</span>
            <textarea
                rows={data?.rows}
                className='p-2 half-border-rad bg-transparent border border-secondary'
                placeholder={data?.placeholder}
                id={data?.label}
                value={data?.value}
                onChange={(e) => {
                    return onChange({
                        label: data?.label,
                        value: e?.target?.value
                    })
                }}
            />
        </label>
    )
}