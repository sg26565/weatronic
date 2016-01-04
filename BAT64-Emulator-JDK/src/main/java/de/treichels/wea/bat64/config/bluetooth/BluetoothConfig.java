package de.treichels.wea.bat64.config.bluetooth;

import de.treichels.wea.bat64.config.ConfigElement;
import de.treichels.wea.bat64.config.value.ByteValue;
import de.treichels.wea.bat64.config.value.ShortValue;
import de.treichels.wea.bat64.config.value.StringValue;

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
