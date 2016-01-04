package de.treichels.wea.bat64.config.receiver;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.curve.Curve;

public class RxCurves extends ConfigElement {
	@Element(name = "RxCurve__00")
	public Curve item0;
	@Element(name = "RxCurve__01")
	public Curve item1;
	@Element(name = "RxCurve__02")
	public Curve item2;
	@Element(name = "RxCurve__03")
	public Curve item3;
	@Element(name = "RxCurve__04")
	public Curve item4;
	@Element(name = "RxCurve__05")
	public Curve item5;
	@Element(name = "RxCurve__06")
	public Curve item6;
	@Element(name = "RxCurve__07")
	public Curve item7;
	@Element(name = "RxCurve__08")
	public Curve item8;
	@Element(name = "RxCurve__09")
	public Curve item9;

	public RxCurves(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
