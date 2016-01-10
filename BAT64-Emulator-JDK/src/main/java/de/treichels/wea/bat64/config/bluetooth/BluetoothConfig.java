package de.treichels.wea.bat64.config.bluetooth;

import de.treichels.wea.bat64.config.ConfigElement;

public class BluetoothConfig extends ConfigElement {
	public String BTName;
	public Short IsActive;
	public String PIN;
	public Short Protocol;
	public ProtocolDetail ProtocolDetail;
	public Integer TxPower;

	public BluetoothConfig() {
		super(83);
	}
}
