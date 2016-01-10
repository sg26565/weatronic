package de.treichels.wea.bat64.config.receiver;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.ConfigGroup;
import de.treichels.wea.bat64.config.adapters.ListAdapter;

public class Receivers extends ConfigGroup {
	private static class ReceiverAdapter extends ListAdapter<Receiver> {
		protected ReceiverAdapter() {
			super(Receiver.class, "Rx__%02d");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(ReceiverAdapter.class)
	public List<Receiver> list;
}
