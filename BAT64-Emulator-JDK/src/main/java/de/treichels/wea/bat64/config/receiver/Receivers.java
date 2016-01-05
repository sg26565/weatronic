package de.treichels.wea.bat64.config.receiver;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.treichels.wea.bat64.config.Group;

public class Receivers extends Group {
	private static class ReceiverAdapter extends Adapter<Receiver> {
		protected ReceiverAdapter() {
			super(Receiver.class, "Rx");
		}
	}

	@XmlAnyElement
	@XmlJavaTypeAdapter(ReceiverAdapter.class)
	public List<Receiver> items;
}
