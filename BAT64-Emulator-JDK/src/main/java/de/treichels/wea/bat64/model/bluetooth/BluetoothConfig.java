package de.treichels.wea.bat64.model.bluetooth;

import de.treichels.wea.bat64.model.ConfigElement;
import de.treichels.wea.bat64.model.value.ByteValue;
import de.treichels.wea.bat64.model.value.ShortValue;
import de.treichels.wea.bat64.model.value.StringValue;

public class BluetoothConfig extends ConfigElement {
	public StringValue BTName;
	public ByteValue IsActive;
	public StringValue PIN;
	public ByteValue Protocol;
	public ProtocolDetail ProtocolDetail;
	public ShortValue TxPower;

	public BluetoothConfig() {
		super(83);
	}
}
