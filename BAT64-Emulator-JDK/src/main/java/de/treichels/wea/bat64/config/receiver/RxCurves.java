package de.treichels.wea.bat64.config.receiver;

import javax.xml.bind.annotation.XmlElement;

import de.treichels.wea.bat64.config.Group;
import de.treichels.wea.bat64.config.curve.Curve;

public class RxCurves extends Group {
	@XmlElement(name = "RxCurve__00")
	public Curve item0;
	@XmlElement(name = "RxCurve__01")
	public Curve item1;
	@XmlElement(name = "RxCurve__02")
	public Curve item2;
	@XmlElement(name = "RxCurve__03")
	public Curve item3;
	@XmlElement(name = "RxCurve__04")
	public Curve item4;
	@XmlElement(name = "RxCurve__05")
	public Curve item5;
	@XmlElement(name = "RxCurve__06")
	public Curve item6;
	@XmlElement(name = "RxCurve__07")
	public Curve item7;
	@XmlElement(name = "RxCurve__08")
	public Curve item8;
	@XmlElement(name = "RxCurve__09")
	public Curve item9;
}
