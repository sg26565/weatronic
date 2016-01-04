package de.treichels.wea.bat64.config.bluetooth;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;

public class BluetoothConfig extends ConfigElement {
	@Element
	public StringValue BTName;
	@Element
	public ByteValue IsActive;
	@Element
	public StringValue PIN;
	@Element
	public ByteValue Protocol;
	@Element
	public ProtocolDetail ProtocolDetail;
	@Element
	public ShortValue TxPower;

	public BluetoothConfig(@Attribute(name = TYPEINFO) final int typeinfo) {
		super(typeinfo);
	}
}
